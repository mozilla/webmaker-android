package mozilla.org.webmaker.activity;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.webkit.JavascriptInterface;
import mozilla.org.webmaker.R;
import mozilla.org.webmaker.WebmakerActivity;

public class Element extends WebmakerActivity {

    static final int REQUEST_IMAGE_CAPTURE = 1;

    public Element() {
        super("element", R.id.element_layout, R.layout.element_layout, R.menu.menu_element);
    }

    public void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
//            mImageView.setImageBitmap(imageBitmap);

        }
    }
}
