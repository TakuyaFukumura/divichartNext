package click.divichartnext.service;

import click.divichartnext.bean.entity.Authorities;
import click.divichartnext.bean.entity.Users;
import click.divichartnext.repository.AuthoritiesRepository;
import click.divichartnext.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CreateUserAccountService {

    private final AuthoritiesRepository authoritiesRepository;
    private final UsersRepository usersRepository;

    @Autowired
    public CreateUserAccountService(AuthoritiesRepository authoritiesRepository,
                                    UsersRepository usersRepository) {
        this.authoritiesRepository = authoritiesRepository;
        this.usersRepository = usersRepository;
    }

    /**
     * ユーザ取得
     *
     * @param username ユーザ名
     * @return 取得したユーザ情報
     */
    public Users getUser(String username) {
        return usersRepository.findByUsername(username);
    }

    /**
     * ユーザ情報作成
     *
     * @param username ユーザ名
     * @param password パスワード
     */
    public void create(String username, String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = "{bcrypt}" + encoder.encode(password);
        Users users = new Users(username, encodedPassword, true);
        usersRepository.save(users);

        Authorities authorities = new Authorities(username, "ROLE_USER");
        authoritiesRepository.save(authorities);
    }
}
