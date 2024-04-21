#pragma header
#define PI 3.14159265359

// Used for editors

/*
//In contrast, I recommend you to use ↓
int steps = 8;
int stepsInside = 1;
*/
int steps = 16;
int stepsInside = 2;
float strength = 0.0075;
vec4 getColor(vec2 pos) {
    pos = clamp(pos, vec2(0.0), vec2(1.0) - vec2(1.0 / openfl_TextureSize));
    return flixel_texture2D(bitmap, pos);
}

void main() {
    vec2 camPos = openfl_TextureCoordv;
    if (any(lessThan(camPos, vec2(0.0))) || any(greaterThan(camPos, vec2(1.0))))
        discard;

    vec4 color = getColor(camPos);
    float fsteps = float(steps);
    float fstepsInside = float(stepsInside);
    float invSteps = 1.0 / fsteps;
    float invStepsInside = 1.0 / fstepsInside;
    vec2 offsetMult = vec2(strength * invStepsInside);

    for (float inside = 1.0; inside < fstepsInside + 1.0; inside++) {
        float angleOffset = inside * PI * 2.0 * invStepsInside;
        float cosOffset = cos(angleOffset);
        float sinOffset = sin(angleOffset);
        for (int i = 0; i < steps; i++) {
            float fi = float(i);
            vec2 offset = vec2(offsetMult.x * cos(fi * invSteps * PI * 2.0 + angleOffset), offsetMult.y * sin(fi * invSteps * PI * 2.0 + angleOffset));
            color += getColor(camPos + offset);
        }
    }

    color /= vec4(float(steps * stepsInside));
    gl_FragColor = color;
}
