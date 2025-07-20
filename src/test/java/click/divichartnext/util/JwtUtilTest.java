package click.divichartnext.util;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(classes = JwtUtil.class)
@TestPropertySource(locations = "classpath:application-test.properties")
class JwtUtilTest {

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    void testGenerateAndValidateToken() {
        // Given
        String username = "testuser";

        // When
        String token = jwtUtil.generateToken(username);

        // Then
        assertNotNull(token);
        assertFalse(token.isEmpty());

        // When validating the token
        String validatedUsername = jwtUtil.validateToken(token);

        // Then
        assertEquals(username, validatedUsername);
    }

    @Test
    void testValidateTokenThrowsExceptionForInvalidToken() {
        // Given
        String invalidToken = "invalid.jwt.token";

        // Then
        assertThrows(RuntimeException.class, () -> {
            jwtUtil.validateToken(invalidToken);
        });
    }
}
