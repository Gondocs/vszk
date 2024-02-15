using vszk.Models.DTO;

namespace vszk.Services
{
    public class RatingService : IRatingService
    {
        private readonly DataContext _context;
        
        public RatingService(DataContext context)
        {
            _context = context;
        }

        public async Task<Rating> PostFeedBack(RatingDTO rate)
        {
            var star = new Star
            {
                All = rate.All_star,
                Simplicity = rate.Simplicity,
                Service = rate.Service,
                Characteristic = rate.Characteristic,
                Price_value = rate.Price_value,
                Recommendation = rate.Recommendation
            };

            var text = new TextRating
            {
                All = rate.All_text,
                Positive = rate.Positive,
                Negative = rate.Negative,
                Reason_of_use = rate.Reason_of_use,
                Duration_of_use = rate.Duration_of_use
            };

            var software = _context.Software.FirstOrDefault(x => x.SoftwareID == rate.SoftwareID);
            var user = _context.User.FirstOrDefault(x => x.UserID == rate.UserID);

            var rating = new Rating
            {
                Datumido = DateTime.Now,
                User = user,
                Software = software,
                Star = star,
                TextRating = text
            };

            _context.Rating.Add(rating);
            await _context.SaveChangesAsync();

            return rating;
        }

        public async Task<Rating> ChangeFeedBack(int id, RatingChangeDTO rate)
        {
            var existingRating = await _context.Rating.Include(x => x.Star).Include(x => x.TextRating).FirstOrDefaultAsync(x => x.RatingID == id);

            if (existingRating == null)
            {
                return null;
            }

            existingRating.Datumido = DateTime.Now;

            existingRating.Star.All = rate.All_star;
            existingRating.Star.Simplicity = rate.Simplicity;
            existingRating.Star.Service = rate.Service;
            existingRating.Star.Characteristic = rate.Characteristic;
            existingRating.Star.Price_value = rate.Price_value;
            existingRating.Star.Recommendation = rate.Recommendation;

            existingRating.TextRating.All = rate.All_text;
            existingRating.TextRating.Positive = rate.Positive;
            existingRating.TextRating.Negative = rate.Negative;
            existingRating.TextRating.Reason_of_use = rate.Reason_of_use;
            existingRating.TextRating.Duration_of_use = rate.Duration_of_use;

            await _context.SaveChangesAsync();

            return existingRating;
        }
    }
}