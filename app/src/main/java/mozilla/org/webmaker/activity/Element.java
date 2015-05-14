package mozilla.org.webmaker.activity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import mozilla.org.webmaker.R;
import mozilla.org.webmaker.WebmakerActivity;
import mozilla.org.webmaker.util.Image;
import java.io.File;

public class Element extends WebmakerActivity {

    final int CAPTURE_IMAGE_FULLSIZE_ACTIVITY_REQUEST_CODE = 1888;

    public Element() {
        super("element", R.id.element_layout, R.layout.element_layout, R.menu.menu_element);
    }

    /**
     * Dispatches a new image capture intent.
     */
    public void dispatchTakePictureIntent() {
        Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
        File file = new File(Environment.getExternalStorageDirectory() + File.separator + "image.jpg");
        intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(file));
        startActivityForResult(intent, CAPTURE_IMAGE_FULLSIZE_ACTIVITY_REQUEST_CODE);
    }

    /**
     * Result handler for the image capture activity.
     *
     * @param requestCode
     * @param resultCode
     * @param data
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == CAPTURE_IMAGE_FULLSIZE_ACTIVITY_REQUEST_CODE) {
            File file = new File(Environment.getExternalStorageDirectory() + File.separator + "image.jpg");
            Bitmap bitmap = Image.decodeBitmapFromFile(file.getAbsolutePath(), 1000, 700);
            String uri = Image.createDataUriFromBitmap(bitmap, 60);
            Log.v("DATAURI", uri);
        }
    }
}
