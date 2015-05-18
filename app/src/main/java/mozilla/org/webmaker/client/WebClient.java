package mozilla.org.webmaker.client;

import android.view.View;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.DecelerateInterpolator;

import org.xwalk.core.XWalkResourceClient;
import org.xwalk.core.XWalkView;

public class WebClient extends XWalkResourceClient {

    /**
     * Default {@link org.xwalk.core.XWalkResourceClient} constructor method.
     */
    public WebClient(XWalkView view) {
        super(view);
    }

    /**
     * A graphical animation played when a {@link org.xwalk.core.XWalkView} is being displayed visually.
     */
    private void animate(XWalkView view) {
        Animation fadeIn = new AlphaAnimation(0, 1);
        fadeIn.setInterpolator(new DecelerateInterpolator());
        fadeIn.setDuration(1000);
        view.startAnimation(fadeIn);
    }

    /**
     * Determines whether the host application is given the chance to take control when a new URL
     * is about to be loaded in the current {@link org.xwalk.core.XWalkView}.
     */
    @Override
    public boolean shouldOverrideUrlLoading(XWalkView view, String url) {
        view.setVisibility(View.GONE);
        return false;
    }

    /**
     * Notify the client that the {@link org.xwalk.core.XWalkView} completes to load
     * the resource specified by the given URL.
     */
    @Override
    public void onLoadFinished(XWalkView view, String url) {
        animate(view);
        view.setVisibility(View.VISIBLE);
        super.onLoadFinished(view, url);
    }

    /**
     * Notify the client the progress info of loading a specific URL.
     */
    @Override
    public void onProgressChanged(XWalkView view, int progressInPercent) {
        if (progressInPercent != 0) {
            animate(view);
            view.setVisibility(View.VISIBLE);
        } else {
            view.setVisibility(View.GONE);
        }
        super.onProgressChanged(view, progressInPercent);
    }
}
