# kotlinx.serialization and Ktor ship their own consumer R8 rules.

# Tink (via the UnifiedPush connector, CHT-1612) refers to optional
# libraries it does not need on Android; R8 must not fail on them.
-dontwarn com.google.api.client.**
-dontwarn org.joda.time.**
-dontwarn org.conscrypt.**
