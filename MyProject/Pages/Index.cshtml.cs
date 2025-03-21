using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace MyProject.Pages
{
    public class IndexModel : PageModel
    {
        [BindProperty]
        public double Weight { get; set; }

        [BindProperty]
        public double Height { get; set; }

        [BindProperty]
        public int Age { get; set; }

        [BindProperty]
        public string Gender { get; set; }

        public IActionResult OnPostCalculateBMR()
        {
            double bmr = 0;

            if (Gender == "male")
            {
                bmr = 88.36 + (13.4 * Weight) + (4.8 * Height) - (5.7 * Age);
            }
            else if (Gender == "female")
            {
                bmr = 447.6 + (9.2 * Weight) + (3.1 * Height) - (4.3 * Age);
            }

            return Content(bmr.ToString("F2"));
        }
    }
}
