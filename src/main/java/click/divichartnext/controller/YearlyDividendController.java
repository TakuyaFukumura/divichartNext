package click.divichartnext.controller;

import click.divichartnext.bean.dto.YearlyDividendDto;
import click.divichartnext.service.YearlyDividendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigDecimal;
import java.util.List;

/**
 * 年別配当グラフ用コントローラ
 */
@Slf4j
@Controller
@RequestMapping("/yearlyDividend")
public class YearlyDividendController {
    private static final int NUM_OF_YEARS = 5;

    private final YearlyDividendService service;

    @Autowired
    public YearlyDividendController(YearlyDividendService yearlyDividendService) {
        this.service = yearlyDividendService;
    }

    /**
     * グラフ表示用のデータを用意してViewへ渡す
     */
    @GetMapping
    public String index(Model model, @AuthenticationPrincipal UserDetails user) {
//        log.debug("年別配当グラフ表示");
//
//        List<Integer> pastYears = service.getLastNYears(NUM_OF_YEARS);
//        String labels = service.createYearLabels(pastYears);
//        List<BigDecimal> yearlyDividendData = service.getYearlyDividendData(pastYears, user.getUsername());
//        String chartData = service.createChartData(yearlyDividendData);
//
//        YearlyDividendDto yearlyDividendDto = new YearlyDividendDto(
//                labels,
//                chartData
//        );
//        model.addAttribute("yearlyDividendDto", yearlyDividendDto);
//
//        return "yearlyDividend";
        return null;
    }
}
