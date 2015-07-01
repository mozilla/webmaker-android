package org.mozilla.webmaker;

import android.app.ActionBar;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.view.MenuItem;

import org.mozilla.webmaker.adapter.SectionsPagerAdapter;
import org.mozilla.webmaker.fragment.WebviewFragment;
import org.mozilla.webmaker.router.Router;
import org.mozilla.webmaker.view.WebmakerWebView;


public class MainActivity extends BaseActivity implements ActionBar.TabListener {

    /**
     * The {@link ViewPager} that will host the section contents.
     */
    private ViewPager mViewPager;
    private SectionsPagerAdapter mSectionsPagerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        if (!isLoggedIn()) {
            Router.sharedRouter().open("/login");
            finish();
        }

        setContentView(R.layout.activity_main);

        // Set up the action bar.
        final ActionBar actionBar = getActionBar();
        if (actionBar == null) throw new NullPointerException("ActionBar has returned null!");
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);
        actionBar.setDisplayShowTitleEnabled(false);
        actionBar.setDisplayShowHomeEnabled(false);

        // Create the adapter that will return a fragment for each of the three primary sections of the activity.
        mSectionsPagerAdapter = new SectionsPagerAdapter(getFragmentManager(), this);

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.pager);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        /**
         * When swiping between different sections, select the corresponding tab.
         * We can also use {@link android.app.ActionBar.Tab#select()} to do this
         * if we have a reference to the {@link android.app.ActionBar.Tab}.
         */
        mViewPager.setOnPageChangeListener(new ViewPager.SimpleOnPageChangeListener() {
            @Override
            public void onPageSelected(int position) {
                actionBar.setSelectedNavigationItem(position);
            }
        });

        // For each of the sections in the app, add a tab to the action bar.
        for (int i = 0; i < mSectionsPagerAdapter.getCount(); i++) {
            /**
             * Create a tab with text corresponding to the page title defined by the adapter.
             * Also specify this Activity object, which implements the the TabListener interface
             * as the callback (listener) for when this tab is selected.
             */
            actionBar.addTab(actionBar.newTab().setText(mSectionsPagerAdapter.getPageTitle(i)).setTabListener(this));
        }

        super.onCreate(savedInstanceState);
    }

    private void sendMessageToWebView(String eventType) {
        int totalFragments = mSectionsPagerAdapter.getCount();
        WebviewFragment currentFragment;
        WebmakerWebView view;
        for (int i = 0; i < totalFragments; i++) {
            currentFragment = (WebviewFragment) getFragmentManager().findFragmentByTag("android:switcher:" + R.id.pager + ":" + i);
            if (currentFragment == null) return;
            view = currentFragment.mWebView;
            if (view == null) return;
            view.load("javascript: window.jsComm && window.jsComm('" + eventType + "')", null);
        }

    }

    @Override
    protected void onResume() {
        sendMessageToWebView("onResume");
        super.onResume();
    }

    @Override
    protected void onPause() {
        sendMessageToWebView("onPause");
        super.onPause();
    }

    @Override
    public void onBackPressed() {
        Intent startMain = new Intent(Intent.ACTION_MAIN);
        startMain.addCategory(Intent.CATEGORY_HOME);
        startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(startMain);
    }

    /**
     * Handle action bar item clicks here. The action bar will automatically handle
     * clicks on the Home/Up button, so long as you specify a parent activity in AndroidManifest.xml
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return item.getItemId() == R.id.action_settings;
    }

    /**
     * When the given tab is selected, switch to the corresponding page in the ViewPager
     */
    @Override
    public void onTabSelected(ActionBar.Tab tab, FragmentTransaction fragmentTransaction) {
        mViewPager.setCurrentItem(tab.getPosition());
    }

    @Override
    public void onTabUnselected(ActionBar.Tab tab, FragmentTransaction fragmentTransaction) {}

    @Override
    public void onTabReselected(ActionBar.Tab tab, FragmentTransaction fragmentTransaction) {}
}
