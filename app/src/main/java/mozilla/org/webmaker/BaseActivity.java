package mozilla.org.webmaker;

import android.app.Activity;

public class BaseActivity extends Activity {
    public void goBack() {
        super.onBackPressed();
    }
}
