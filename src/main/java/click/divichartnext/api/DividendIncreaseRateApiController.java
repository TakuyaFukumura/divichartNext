package click.divichartnext.api;

import click.divichartnext.bean.dto.DividendIncreaseRateDto;
import click.divichartnext.service.DividendIncreaseRateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * 配当増加率データを提供するAPI
 */
@Slf4j
@RestController
@RequestMapping("/api/dividendIncreaseRate")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class DividendIncreaseRateApiController {

    private final DividendIncreaseRateService service;

    @Autowired
    public DividendIncreaseRateApiController(DividendIncreaseRateService dividendIncreaseRateService) {
        this.service = dividendIncreaseRateService;
    }

    /**
     * グラフ用のJSONデータを提供
     */
    @GetMapping
    public DividendIncreaseRateDto getDividendIncreaseRate(@AuthenticationPrincipal UserDetails user) {
        log.debug("配当増加率データを取得");

        List<Integer> pastYears = service.getLastNYears(5);

        List<BigDecimal> rateData = service.getDividendIncreaseRateData(pastYears, "admin");//user.getUsername());

        return new DividendIncreaseRateDto(pastYears, rateData);
    }
}
