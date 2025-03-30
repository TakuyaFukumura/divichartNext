package click.divichartnext.api;

import click.divichartnext.bean.dto.YearlyCumulativeDividendDto;
import click.divichartnext.bean.form.YearlyCumulativeDividendForm;
import click.divichartnext.service.YearlyCumulativeDividendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

/**
 * 年間累計配当データを提供するAPI
 */
@Slf4j
@RestController
@RequestMapping("/api/yearlyCumulativeDividend")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class YearlyCumulativeDividendApiController {

    private final YearlyCumulativeDividendService service;

    @Autowired
    public YearlyCumulativeDividendApiController(YearlyCumulativeDividendService yearlyCumulativeDividendService) {
        this.service = yearlyCumulativeDividendService;
    }

    /**
     * グラフ用のJSONデータを提供
     */
    @GetMapping
    public YearlyCumulativeDividendDto getYearlyCumulativeDividend(@AuthenticationPrincipal UserDetails user,
                                                                   YearlyCumulativeDividendForm yearlyCumulativeDividendForm) {
        log.debug("年間累計配当データを取得");

        int targetYear = service.getTargetYear(yearlyCumulativeDividendForm.getTargetYear());
        List<BigDecimal> yearlyCumulativeDividendData =
                service.getYearlyCumulativeDividendData(targetYear, "admin");//user.getUsername());

        List<Integer> pastYears = service.getLastNYears(5);

        return new YearlyCumulativeDividendDto(
                pastYears.stream().sorted(Comparator.reverseOrder()).toList(), // 逆順でソート
                targetYear,
                yearlyCumulativeDividendData
        );
    }
}
