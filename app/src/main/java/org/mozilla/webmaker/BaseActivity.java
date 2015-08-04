package org.mozilla.webmaker;

import android.app.Activity;
import android.content.SharedPreferences;

import org.mozilla.webmaker.web.javascript.WebAppInterface;

public class BaseActivity extends Activity {
    public void goBack() {
        super.onBackPressed();
    }
    public boolean isLoggedIn() {
        SharedPreferences userSession = getSharedPreferences(WebAppInterface.USER_SESSION_KEY, 0);
        String session = userSession.getString("session", "");
        return session != null && session != "";
    }
}
