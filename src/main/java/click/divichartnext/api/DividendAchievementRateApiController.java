package click.divichartnext.api;

import click.divichartnext.bean.dto.DividendAchievementRateDto;
import click.divichartnext.service.DividendAchievementRateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * 配当達成率データを提供するAPI
 */
@Slf4j
@RestController
@RequestMapping("/api/dividendAchievementRate")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class DividendAchievementRateApiController {

    private final DividendAchievementRateService service;

    @Autowired
    public DividendAchievementRateApiController(DividendAchievementRateService dividendAchievementRateService) {
        this.service = dividendAchievementRateService;
    }

    /**
     * グラフ用のJSONデータを提供
     */
    @GetMapping
    public DividendAchievementRateDto getDividendAchievementRate(@RequestParam(required = false, defaultValue = "135")
                                                                     String goalDividendAmount,
                                                                 @AuthenticationPrincipal UserDetails user) {
        log.debug("配当達成率データを取得");

        List<Integer> pastYears = service.getLastNYears(5);
        List<Integer> recentYearsAsc = service.getLastNYearsAsc(5);
        BigDecimal annualGoalDividendAmount = service.getAnnualGoalDividendAmount(goalDividendAmount);

        List<BigDecimal> dividendAchievementRates = service.getDividendAchievementRates(
                recentYearsAsc, annualGoalDividendAmount, "admin");//user.getUsername());
        String chartData = service.createChartData(dividendAchievementRates);

        String goalDividendAmountYen = service.exchange(goalDividendAmount, "150");

        String labels = service.createYearLabels(pastYears);

        return new DividendAchievementRateDto(
                labels,
                chartData,
                goalDividendAmount,
                goalDividendAmountYen
        );
    }
}
