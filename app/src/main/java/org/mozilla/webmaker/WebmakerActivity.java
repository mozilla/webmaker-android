package org.mozilla.webmaker;

import android.app.ActionBar;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.MenuItem;
import android.view.ViewConfiguration;
import android.widget.RelativeLayout;

import org.json.JSONException;
import org.json.JSONObject;

import org.mozilla.webmaker.util.Image;
import org.mozilla.webmaker.view.WebmakerWebView;

import java.io.File;
import java.lang.reflect.Field;
import java.util.UUID;

public class WebmakerActivity extends BaseActivity {

    public WebmakerWebView view;
    public String mUuid = UUID.randomUUID().toString();
    public File mFile = new File(Environment.getExternalStorageDirectory() + File.separator + mUuid + ".jpg");
    protected JSONObject routeParams;
    protected String pageName;
    protected int id, layoutResID, menuResId;
    protected boolean mIsRestart = false;
    protected final int CAMERA_REQUEST_CODE = 1888;
    protected final int MEDIA_REQUEST_CODE = 1889;


    public WebmakerActivity(String pageName, int id, int layoutResID, int menuResId) {
        this.pageName = pageName;
        this.id = id;
        this.layoutResID = layoutResID;
        this.menuResId = menuResId;
    }

    /**
     * Extracts route information from intent extras & Adds {@link org.mozilla.webmaker.view.WebmakerWebView} to layout.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        routeParams = new JSONObject();

        Bundle intentExtras = getIntent().getExtras();
        if (intentExtras != null) {
            try {
                routeParams.put("user", intentExtras.get("user"));
                routeParams.put("project", intentExtras.get("project"));
                routeParams.put("page", intentExtras.get("page"));
                routeParams.put("element", intentExtras.get("element"));
                routeParams.put("propertyName", intentExtras.get("propertyName"));
                routeParams.put("editor", intentExtras.get("editor"));
                routeParams.put("mode", intentExtras.get("mode"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        ActionBar actionBar = getActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
            actionBar.setIcon(android.R.color.transparent);
        }

        try {
            ViewConfiguration config = ViewConfiguration.get(this);
            Field menuKeyField = ViewConfiguration.class.getDeclaredField("sHasPermanentMenuKey");
            if (menuKeyField != null) {
                menuKeyField.setAccessible(true);
                menuKeyField.setBoolean(config, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        setContentView(layoutResID);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onRestart() {
        mIsRestart = true;
        super.onRestart();
    }

    @Override
    protected void onStart() {
        if (!mIsRestart) {
            view = new WebmakerWebView(this, this, pageName, routeParams);
            RelativeLayout layout = (RelativeLayout) findViewById(id);
            layout.addView(view);
        }

        super.onStart();
    }

    @Override
    public void onBackPressed() {
        view.load("javascript: window.jsComm && window.jsComm('onBackPressed')", null);
    }

    @Override
    protected void onResume() {
        view.load("javascript: window.jsComm && window.jsComm('onResume')", null);
        super.onResume();
    }

    @Override
    protected void onPause() {
        view.load("javascript: window.jsComm && window.jsComm('onPause')", null);
        super.onPause();
    }

    @Override
    public void onDestroy() {
        if (view != null) {
            view.onDestroy();
            view = null;
        }
        super.onDestroy();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch(item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * Dispatches a new image capture intent.
     */
    public void dispatchCameraIntent() {
        Intent intent = Image.getCameraIntent(mFile);
        startActivityForResult(intent, CAMERA_REQUEST_CODE);
    }

    /**
     * Dispatches a new media gallery intent.
     */
    public void dispatchMediaIntent() {
        Intent intent = Image.getMediaStoreIntent(mFile);
        startActivityForResult(intent, MEDIA_REQUEST_CODE);
    }

    /**
     * Result handler for the image capture activity.
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        Bitmap bitmap = null;

        // Return if user exited without capturing / selecting an image
        if (resultCode == 0) {
            view.load("javascript: window.onMediaCancel && window.onMediaCancel()", null);
            return;
        }

        // Handle camera activity
        if (requestCode == CAMERA_REQUEST_CODE) {
            bitmap = Image.decodeBitmapFromFile(mFile.getAbsolutePath(), 600, 600);
        }

        // Handle media (gallery) activity
        if (requestCode == MEDIA_REQUEST_CODE) {
            bitmap = Image.decodeBitmapFromMediaStore(data.getData(), 600, this);
        }

        // @todo Handle error
        if (bitmap == null) {
            Log.e("DATAURI:ERROR", "Bitmap is null");
            return;
        }

        // Convert bitmap to data uri and forward to JS
        String uri = Image.createDataUriFromBitmap(bitmap, 80);
        view.load("javascript: window.imageReady && window.imageReady('" + uri + "')", null);
    }
}
