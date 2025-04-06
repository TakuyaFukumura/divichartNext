package click.divichartnext.api;

import click.divichartnext.bean.dto.DividendIncreaseDto;
import click.divichartnext.service.DividendIncreaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * 配当増加額データを提供するAPI
 */
@Slf4j
@RestController
@RequestMapping("/api/dividendIncrease")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class DividendIncreaseApiController {
    private static final int NUM_OF_YEARS = 6;

    private final DividendIncreaseService service;

    @Autowired
    public DividendIncreaseApiController(DividendIncreaseService dividendIncreaseService) {
        this.service = dividendIncreaseService;
    }

    /**
     * グラフ用のJSONデータを提供
     */
    @GetMapping
    public DividendIncreaseDto getDividendIncrease(@AuthenticationPrincipal UserDetails user) {
        log.debug("配当増加額データを取得");

        List<Integer> pastYears = service.getLastNYears(NUM_OF_YEARS);
        List<BigDecimal> dividendIncreaseData = service.getDividendIncreaseData(pastYears, "admin");//user.getUsername());

        return new DividendIncreaseDto(pastYears, dividendIncreaseData);
    }
}
