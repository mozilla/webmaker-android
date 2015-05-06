package mozilla.org.webmaker.fragment;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import mozilla.org.webmaker.R;
import mozilla.org.webmaker.view.WebmakerWebView;

@SuppressLint("SetJavaScriptEnabled")
public class WebviewFragment extends Fragment {

    /**
     * The fragment argument representing the section number for this fragment.
     */
    private static final String ARG_SECTION_NUMBER = "section_number";
    private WebmakerWebView mWebView = null;

    /**
     * Returns a new instance of this fragment for the given section number.
     */
    public static WebviewFragment newInstance(int sectionNumber) {
        WebviewFragment fragment = new WebviewFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_SECTION_NUMBER, sectionNumber);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View mView = inflater.inflate(R.layout.fragment_main, container, false);
        String sectionId = Integer.toString(super.getArguments().getInt(ARG_SECTION_NUMBER));
        String pageId = null;

        // Assign page by sectionId
        switch (sectionId) {
            case "1":
                pageId = "discover";
                break;
            case "2":
                pageId = "make";
                break;
        }

        // Create webview
        mWebView = new WebmakerWebView(mView.getContext(), pageId);
        RelativeLayout layout = (RelativeLayout)mView.findViewById(R.id.webview_fragment);
        layout.addView(mWebView);
        return mView;
    }

    @Override
    public void onDestroyView() {
        if (mWebView == null) return;
        mWebView.destroy();
        mWebView = null;
        super.onDestroyView();
    }
}