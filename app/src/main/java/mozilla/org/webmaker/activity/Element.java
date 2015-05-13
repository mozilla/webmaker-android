package mozilla.org.webmaker.activity;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;
import mozilla.org.webmaker.R;
import mozilla.org.webmaker.WebmakerActivity;

import java.io.ByteArrayOutputStream;

public class Element extends WebmakerActivity {

    static final int REQUEST_IMAGE_CAPTURE = 1;

    public Element() {
        super("element", R.id.element_layout, R.layout.element_layout, R.menu.menu_element);
    }

    /**
     * Dispatches a new image capture intent.
     */
    public void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
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
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
//            mImageView.setImageBitmap(imageBitmap);
            Log.v("DATAURI", bitmapToDataUri(imageBitmap));

        }
    }

    protected String bitmapToDataUri(Bitmap image) {
        return "data:image/jpg;base64,".concat(encodeTobase64(image));
    }

    protected String encodeTobase64(Bitmap image) {
        Bitmap immagex=image;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        immagex.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        byte[] b = baos.toByteArray();
        String imageEncoded = Base64.encodeToString(b, Base64.DEFAULT);

        return imageEncoded;
    }
}
