/**
 * JWTトークンをローカルストレージから取得する
 * @returns {Object} トークンとエラー情報のオブジェクト
 */
export function getAuthToken(): { token: string | null; error: string | null } {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return { token: null, error: "認証トークンが見つかりません。ログインしてください。" };
  }
  return { token, error: null };
}

/**
 * 認証ヘッダーを生成する
 * @returns {Object} ヘッダーオブジェクトとエラー情報
 */
export function getAuthHeaders(): { headers: Record<string, string> | null; error: string | null } {
  const { token, error } = getAuthToken();
  if (error) {
    return { headers: null, error };
  }
  
  return { 
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    error: null 
  };
}
