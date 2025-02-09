namespace vszk.Services
{
    public interface IRatingService
    {
        Task<Rating> PostFeedBack(RatingDTO rate);

        Task<Rating> ChangeFeedBack(int id, RatingChangeDTO rate);

        Task<Rating> DeleteFeedBack(int userId, int softwareId);
        Task<List<Rating>> GetAllRatings();

        Task<Rating> GetRatingByUserIdAndSoftwareId(int userId, int softwareId);

        Task<Rating> PutRatingByUserIdAndSoftwareId(int userId, int softwareId, RatingDTO rate);
        
        Task<List<Rating>> GetRatingBySoftwareId(int softwareId);
    }
}