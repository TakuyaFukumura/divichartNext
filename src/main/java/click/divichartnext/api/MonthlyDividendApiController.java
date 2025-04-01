package click.divichartnext.api;

import click.divichartnext.bean.dto.MonthlyDividendDto;
import click.divichartnext.bean.form.MonthlyDividendForm;
import click.divichartnext.service.MonthlyDividendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

/**
 * 月別配当データを提供するAPI
 */
@Slf4j
@RestController
@RequestMapping("/api/monthlyDividend")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class MonthlyDividendApiController {
    private static final int NUM_OF_YEARS = 5;

    private final MonthlyDividendService service;

    @Autowired
    public MonthlyDividendApiController(MonthlyDividendService monthlyDividendService) {
        this.service = monthlyDividendService;
    }

    /**
     * グラフ用のJSONデータを提供
     */
    @GetMapping
    public MonthlyDividendDto getMonthlyDividend(@AuthenticationPrincipal UserDetails user,
                                                 MonthlyDividendForm monthlyDividendForm) {
        log.debug("月別配当データを取得");

        int targetYear = service.getTargetYear(monthlyDividendForm.getTargetYear());
        List<BigDecimal> monthlyDividend = service.getMonthlyDividendData(targetYear, "admin");//user.getUsername());
        List<Integer> pastYears = service.getLastNYears(NUM_OF_YEARS);

        return new MonthlyDividendDto(
                pastYears.stream().sorted(Comparator.reverseOrder()).toList(), // 逆順で文字列化
                targetYear,
                monthlyDividend
        );
    }
}
