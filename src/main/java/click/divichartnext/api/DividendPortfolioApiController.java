package click.divichartnext.api;

import click.divichartnext.bean.DividendSummaryBean;
import click.divichartnext.bean.dto.DividendPortfolioDto;
import click.divichartnext.bean.form.DividendPortfolioForm;
import click.divichartnext.service.DividendPortfolioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

/**
 * 配当ポートフォリオデータを提供するAPI
 */
@Slf4j
@RestController
@RequestMapping("/api/dividendPortfolio")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class DividendPortfolioApiController {

    private final DividendPortfolioService service;

    @Autowired
    public DividendPortfolioApiController(DividendPortfolioService dividendPortfolioService) {
        this.service = dividendPortfolioService;
    }

    /**
     * チャート描画用のデータを提供
     */
    @GetMapping
    public DividendPortfolioDto getDividendPortfolio(@AuthenticationPrincipal UserDetails user,
                                                     DividendPortfolioForm dividendPortfolioForm) {
        log.debug("配当ポートフォリオデータを取得");

        int targetYear = service.getTargetYear(dividendPortfolioForm.getTargetYear());
        List<Integer> pastYears = service.getLastNYears(5);

        List<DividendSummaryBean> dividendSummaryBeanList = service.getDividendPortfolioData(targetYear, "admin");//user.getUsername());

        BigDecimal dividendSum = service.getDividendSum(targetYear, "admin");//user.getUsername());

        List<BigDecimal> chartData = service.getChartData(dividendSummaryBeanList);
        List<String> dividendPortfolioLabels = service.getDividendPortfolioLabels(dividendSum, dividendSummaryBeanList);

        return new DividendPortfolioDto(
                pastYears.stream().sorted(Comparator.reverseOrder()).toList(), // 逆順にする
                targetYear,
                dividendPortfolioLabels,
                chartData
        );
    }
}
