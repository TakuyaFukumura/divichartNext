package click.divichartnext.api;

import click.divichartnext.bean.dto.YearlyDividendDto;
import click.divichartnext.service.YearlyDividendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * 年別配当データを提供するAPI
 */
@Slf4j
@RestController
@RequestMapping("/api/yearlyDividend")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class YearlyDividendApiController {
    private static final int NUM_OF_YEARS = 5;

    private final YearlyDividendService service;

    @Autowired
    public YearlyDividendApiController(YearlyDividendService yearlyDividendService) {
        this.service = yearlyDividendService;
    }

    /**
     * グラフ用のJSONデータを提供
     */
    @GetMapping
    public YearlyDividendDto getYearlyDividend(@AuthenticationPrincipal UserDetails user) {
        log.debug("年別配当データを取得");

        List<Integer> pastYears = service.getLastNYears(NUM_OF_YEARS);
        String labels = service.createYearLabels(pastYears);
        List<BigDecimal> yearlyDividendData = service.getYearlyDividendData(pastYears, "admin");//user.getUsername());
        String chartData = service.createChartData(yearlyDividendData);

        return new YearlyDividendDto(pastYears, yearlyDividendData);
    }
}
