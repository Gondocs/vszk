namespace vszk.Services
{
    public interface IRatingService
    {
        Task<Rating> PostFeedBack(RatingDTO rate);

        Task<Rating> ChangeFeedBack(int id, RatingChangeDTO rate);

        Task<Rating> DeleteFeedBack(int id);

        Task<List<Rating>> GetAllRatings();

        Task<Rating> GetRatingByUserIdAndSoftwareId(int userId, int softwareId);
    }
}