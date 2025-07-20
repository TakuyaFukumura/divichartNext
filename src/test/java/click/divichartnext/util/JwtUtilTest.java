package click.divichartnext.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil("mySecretKeyThatIsAtLeast32BytesLong!!");
    }

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