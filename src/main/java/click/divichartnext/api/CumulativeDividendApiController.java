package click.divichartnext.api;

import click.divichartnext.bean.dto.CumulativeDividendDto;
import click.divichartnext.service.CumulativeDividendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * 累計配当データを提供するAPI
 */
@Slf4j
@RestController
@RequestMapping("/api/cumulativeDividend")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class CumulativeDividendApiController {

    private final CumulativeDividendService service;

    @Autowired
    public CumulativeDividendApiController(CumulativeDividendService cumulativeDividendService) {
        this.service = cumulativeDividendService;
    }

    /**
     * グラフ用のJSONデータを提供
     */
    @GetMapping
    public CumulativeDividendDto getCumulativeDividend(@AuthenticationPrincipal UserDetails user) {
        log.debug("累計配当データを取得");

        List<Integer> pastYears = service.getLastNYearsAsc(5);

        List<BigDecimal> cumulativeDividendData = service.getCumulativeDividendData(pastYears, "admin");//user.getUsername());

        return new CumulativeDividendDto(pastYears, cumulativeDividendData);
    }
}
