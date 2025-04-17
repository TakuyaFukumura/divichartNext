package click.divichartnext.api;

import click.divichartnext.bean.dto.DividendHistoryDto;
import click.divichartnext.bean.form.DividendHistoryEditForm;
import click.divichartnext.service.DividendHistoryEditService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * 配当履歴編集用API
 */
@Slf4j
@RestController
@RequestMapping("/api/dividendHistoryEdit")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class DividendHistoryEditApiController {

    private final DividendHistoryEditService service;

    @Autowired
    public DividendHistoryEditApiController(DividendHistoryEditService dividendHistoryEditService) {
        this.service = dividendHistoryEditService;
    }

    /**
     * 配当履歴を取得
     *
     * @param id 配当履歴の主キー（ID）
     * @return 配当履歴DTO
     */
    @GetMapping("/{id}")
    public DividendHistoryDto getDividendHistory(@PathVariable("id") Long id) {
        log.debug("配当履歴データを取得: id={}", id);
        return service.getDividendHistory(id);
    }

    /**
     * 配当履歴を更新
     *
     * @param form 編集後の配当履歴情報
     * @param user ログインユーザ情報
     */
    @PostMapping("/submit")
    public void updateDividendHistory(@RequestBody DividendHistoryEditForm form, @AuthenticationPrincipal UserDetails user) {
        log.debug("配当履歴データを更新: id={}, user={}", form.getId(), "admin");//user.getUsername());
        service.save(
                form.getId(),
                form.getTickerSymbol(),
                form.getAmountReceived(),
                form.getReceiptDate(),
                "admin"//user.getUsername()
        );
    }
}
