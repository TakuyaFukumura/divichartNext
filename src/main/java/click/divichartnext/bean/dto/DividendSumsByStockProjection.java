package click.divichartnext.bean.dto;

import java.math.BigDecimal;

public interface DividendSumsByStockProjection {
    String getTickerSymbol();

    BigDecimal getAmountReceived();
}
