/**
 * Safely parses a string into an integer. 
 * If the string is undefined or not a valid number, 
 * a default value is returned instead.
 *
 * @param value - The string value to be parsed into an integer.
 * @param defaultValue - The fallback value to return in case of an invalid input or undefined string.
 * @returns - Returns the parsed integer or the default value if parsing is unsuccessful.
 */
export function safeParseInt(value: string | undefined, defaultValue: number): number {
    // Check if the input 'value' is undefined or empty.
    // If it is, return the provided default value.
    if (!value) return defaultValue;

    // Attempt to parse the string into an integer using base 10.
    const parsed = parseInt(value, 10);

    // Check if the parsed result is a valid number.
    // If not, return the default value. Otherwise, return the parsed integer.
    return isNaN(parsed) ? defaultValue : parsed;
}