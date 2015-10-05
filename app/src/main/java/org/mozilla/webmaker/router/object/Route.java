package org.mozilla.webmaker.router.object;
/*
 * This file is part of SimpleRouter, licensed under the MIT License (MIT).
 *
 * Copyright (c) Ryan W
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import android.app.Activity;
import android.os.Bundle;

import org.mozilla.webmaker.router.util.RouteCallback;

public class Route {

    private String routeName;
    private Bundle parameters;
    private RouteCallback<Route> callback;
    private Class<? extends Activity> targetClass;

    public Route(String routeName) {
        this.routeName = routeName;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setParameters(Bundle parameters) {
        this.parameters = parameters;
    }

    public Bundle getParameters() {
        return parameters;
    }

    public void setCallback(RouteCallback<Route> callback) {
        this.callback = callback;
    }

    public RouteCallback<Route> getCallback() {
        return callback;
    }

    public void setTargetClass(Class<? extends Activity> targetClass) {
        this.targetClass = targetClass;
    }

    public Class<? extends Activity> getTargetClass() {
        return targetClass;
    }
}
