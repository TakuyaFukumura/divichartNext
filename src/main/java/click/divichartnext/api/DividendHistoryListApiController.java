package click.divichartnext.api;

import click.divichartnext.bean.entity.DividendHistory;
import click.divichartnext.bean.form.list.InsertForm;
import click.divichartnext.service.DividendHistoryListService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 配当履歴一覧用APIコントローラ
 */
@Slf4j
@RestController
@RequestMapping("/api/dividendHistoryList")
@CrossOrigin(origins = "http://localhost:3000")
public class DividendHistoryListApiController {

    private final DividendHistoryListService service;

    @Autowired
    public DividendHistoryListApiController(DividendHistoryListService dividendHistoryListService) {
        this.service = dividendHistoryListService;
    }

    /**
     * 指定ページの配当履歴一覧情報を取得
     *
     * @param pageable ページ情報
     * @param user     ログインユーザ情報
     * @return 配当履歴のページ情報
     */
    @GetMapping
    public Page<DividendHistory> getDividendHistoryPage(Pageable pageable, @AuthenticationPrincipal UserDetails user) {
        log.debug("配当履歴一覧データ取得");
        return service.getDividendHistoryPage(
                "admin"//user.getUsername()
                ,pageable
        );
    }

    /**
     * 配当履歴を追加
     *
     * @param insertForm 配当履歴情報
     * @param user       ログインユーザ情報
     */
    @PostMapping("/insert")
    public void insertDividendHistory(@RequestBody InsertForm insertForm, @AuthenticationPrincipal UserDetails user) {
        log.debug("配当履歴登録");
        service.insertDividendHistory(
                insertForm.getTickerSymbol(),
                insertForm.getAmountReceived(),
                insertForm.getReceiptDate(),
                "admin"//user.getUsername()
        );
    }

    /**
     * 配当履歴を一括登録
     *
     * @param csvFile 配当情報CSV
     * @param user    ログインユーザ情報
     */
    @PostMapping("/bulkInsert")
    public void bulkInsertDividendHistory(@RequestParam("csvFile") MultipartFile csvFile, @AuthenticationPrincipal UserDetails user) {
        log.debug("配当履歴CSV一括登録");
        service.bulkInsert(
                csvFile,
                "admin"//user.getUsername()
        );
    }
}
