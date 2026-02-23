#include <jni.h>
#include "NitroMeasurementsOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::nitromeasurements::initialize(vm);
}
