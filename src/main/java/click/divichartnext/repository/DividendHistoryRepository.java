package click.divichartnext.repository;

import click.divichartnext.bean.dto.DividendSumsByStockProjection;
import click.divichartnext.bean.entity.DividendHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * 配当履歴テーブル（dividend_history）のCRUD操作用クラス
 */
public interface DividendHistoryRepository extends JpaRepository<DividendHistory, Long> {

    /**
     * 指定期間の配当受取合計額を取得する
     *
     * @param startDate 開始日
     * @param endDate   終了日
     * @param username  ユーザ名
     * @return 配当受取合計額
     */
    @Query(value = """
            SELECT
                COALESCE(SUM(amount_received), 0) AS dividend_sum
            FROM dividend_history
            WHERE receipt_date BETWEEN :startDate AND :endDate
            AND username = :username
            """, nativeQuery = true)
    BigDecimal getDividendSum(
            @Param("startDate") LocalDate startDate
            , @Param("endDate") LocalDate endDate
            , @Param("username") String username
    );

    /**
     * 指定期間内の銘柄別配当受取金額合計を取得
     *
     * @param startDate 開始日
     * @param endDate   終了日
     * @param username  ユーザ名
     * @return 銘柄別配当受取金額
     */
    @Query(value = """
            SELECT
                COALESCE(ticker_symbol, '') AS ticker_symbol,
                COALESCE(SUM(amount_received), 0) AS amount_received
            FROM dividend_history
            WHERE receipt_date BETWEEN :startDate AND :endDate
            AND username = :username
            GROUP BY ticker_symbol
            ORDER BY amount_received DESC
            """, nativeQuery = true)
    List<DividendSumsByStockProjection> findDividendSumsByStock(
            @Param("startDate") LocalDate startDate
            , @Param("endDate") LocalDate endDate
            , @Param("username") String username
    );
}
