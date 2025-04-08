package click.divichartnext.api;

import click.divichartnext.bean.form.CreateUserAccountForm;
import click.divichartnext.service.CreateUserAccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/createUserAccount")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsのURLに変更
public class CreateUserAccountApiController {

    private final CreateUserAccountService service;

    @Autowired
    public CreateUserAccountApiController(CreateUserAccountService service) {
        this.service = service;
    }

    /**
     * ユーザアカウント作成
     *
     * @param createUserAccountForm ユーザ情報
     * @return 成功メッセージまたはエラーメッセージ
     */
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody CreateUserAccountForm createUserAccountForm) {
        try {
            service.create(
                    createUserAccountForm.getUsername(),
                    createUserAccountForm.getPassword()
            );
            return ResponseEntity.ok("アカウント作成に成功しました");
        } catch (DataAccessException e) {
            log.error("アカウント作成に失敗しました", e);
            return ResponseEntity.status(500).body("アカウント作成に失敗しました");
        }
    }
}
