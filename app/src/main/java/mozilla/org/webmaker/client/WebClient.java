package mozilla.org.webmaker.client;

import android.view.View;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.DecelerateInterpolator;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class WebClient extends WebViewClient {

    private void animate(WebView view) {
        Animation fadeIn = new AlphaAnimation(0, 1);
        fadeIn.setInterpolator(new DecelerateInterpolator()); //add this
        fadeIn.setDuration(1000);
        view.startAnimation(fadeIn);
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        view.setVisibility(View.GONE);
        return false;
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        animate(view);
        view.setVisibility(View.VISIBLE);
        super.onPageFinished(view, url);
    }
}
