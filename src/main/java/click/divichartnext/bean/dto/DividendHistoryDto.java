package click.divichartnext.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;

/**
 * 配当履歴DTO
 */
@Data
@AllArgsConstructor
public class DividendHistoryDto implements Serializable {
    private Long id;
    private String tickerSymbol;
    private BigDecimal amountReceived;
    private Date receiptDate;
}
