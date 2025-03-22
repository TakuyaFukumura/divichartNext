package click.divichartnext.repository;

import click.divichartnext.bean.entity.Authorities;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * ログイン用ユーザのロール管理テーブル（authorities）のCRUD操作用クラス
 */
public interface AuthoritiesRepository extends JpaRepository<Authorities, String> {
    Authorities findByUsername(String username);
}
