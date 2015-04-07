package mozilla.org.webmaker.fragment;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.JavascriptInterface;
import android.view.animation.Animation;
import android.view.animation.AlphaAnimation;
import android.view.animation.DecelerateInterpolator;
import mozilla.org.webmaker.R;
import android.util.Log;
import android.content.Context;
import java.lang.annotation.Annotation;

@SuppressLint("SetJavaScriptEnabled")
public class PlaceholderFragment extends Fragment {

    /**
     * The fragment argument representing the section number for this fragment.
     */
    private static final String ARG_SECTION_NUMBER = "section_number";


    /**
     * Returns a new instance of this fragment for the given section number.
     */
    public static PlaceholderFragment newInstance(int sectionNumber) {
        PlaceholderFragment fragment = new PlaceholderFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_SECTION_NUMBER, sectionNumber);
        fragment.setArguments(args);
        return fragment;
    }

    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void logText(String txt){
            Log.v("wm", txt);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_main, container, false);
        WebView webview;
        String sectionId;

        rootView.setId(View.generateViewId());
        sectionId = Integer.toString(super.getArguments().getInt(ARG_SECTION_NUMBER));

        webview = (WebView) rootView.findViewById(R.id.activity_main_webview);
        webview.getSettings().setJavaScriptEnabled(true);
        webview.setWebViewClient(new WebClient());
        webview.loadUrl("file:///android_asset/www/pages/section-" + sectionId + "/index.html");
        webview.setBackgroundColor(0x00000000);
        webview.addJavascriptInterface(new WebAppInterface(rootView.getContext()), "Android");
        webview.setWebContentsDebuggingEnabled(true);

        return rootView;
    }

    private void animate(final WebView view) {
        Animation fadeIn = new AlphaAnimation(0, 1);
        fadeIn.setInterpolator(new DecelerateInterpolator()); //add this
        fadeIn.setDuration(1000);
        view.startAnimation(fadeIn);
    }

    private class WebClient extends WebViewClient {

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
}