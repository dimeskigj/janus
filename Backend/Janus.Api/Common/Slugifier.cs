using Slugify;

namespace Janus.Api.Common;

public static class Slugifier
{
    private static SlugHelperConfiguration Configuration => new()
    {
        StringReplacements = new Dictionary<string, string>
        {
            [" "] = "-",
            ["а"] = "a",
            ["б"] = "b",
            ["в"] = "v",
            ["г"] = "g",
            ["д"] = "d",
            ["ѓ"] = "gj",
            ["е"] = "e",
            ["ж"] = "zh",
            ["з"] = "z",
            ["ѕ"] = "dz",
            ["и"] = "i",
            ["ј"] = "j",
            ["к"] = "k",
            ["л"] = "l",
            ["љ"] = "lj",
            ["м"] = "m",
            ["н"] = "n",
            ["њ"] = "nj",
            ["о"] = "o",
            ["п"] = "p",
            ["р"] = "r",
            ["с"] = "s",
            ["т"] = "t",
            ["ќ"] = "kj",
            ["у"] = "u",
            ["ф"] = "f",
            ["х"] = "h",
            ["ц"] = "c",
            ["ч"] = "ch",
            ["џ"] = "dj",
            ["ш"] = "sh"
        }
    };

    public static string Slugify(string toSlugify)
    {
        var helper = new SlugHelper(Configuration);
        var slug = helper.GenerateSlug(toSlugify);
        var hexUnixTimestamp = $"{DateTimeOffset.UtcNow.ToUnixTimeSeconds():x}";
        var trimmedSlug = slug[..(slug.Length <= 100 ? slug.Length : 100)].Trim();
        return $"{trimmedSlug}-{hexUnixTimestamp}";
    }
}