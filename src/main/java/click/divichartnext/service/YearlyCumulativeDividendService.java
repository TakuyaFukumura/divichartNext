package click.divichartnext.service;

import click.divichartnext.repository.DividendHistoryRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class YearlyCumulativeDividendService extends DividendService {

    public YearlyCumulativeDividendService(DividendHistoryRepository dividendHistoryRepository) {
        super(dividendHistoryRepository);
    }

    /**
     * 指定された年の累積配当データを取得します。
     *
     * <p>対象年とユーザー名を指定して、各月の配当額を取得し、それを累積したリストを返します。</p>
     *
     * @param targetYear 配当データを取得する対象の年。
     * @param username   配当データを取得する対象のユーザー名。
     * @return 各月の累積配当額のリスト（1月から12月まで）。
     */
    public List<BigDecimal> getYearlyCumulativeDividendData(int targetYear, String username) {
        List<BigDecimal> monthlyDividend = getMonthlyDividend(targetYear, username);
        List<BigDecimal> cumulativeDividend = new ArrayList<>(monthlyDividend);

        for (int i = 1; i < cumulativeDividend.size(); i++) {
            BigDecimal sumDividend = cumulativeDividend.get(i).add(cumulativeDividend.get(i - 1));
            cumulativeDividend.set(i, sumDividend);
        }
        return Collections.unmodifiableList(cumulativeDividend);
    }
}
