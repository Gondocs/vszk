namespace vszk.Services
{
    public interface IRatingService
    {
        Task<Rating> PostFeedBack(RatingDTO rate);

        Task<Rating> ChangeFeedBack(int id, RatingChangeDTO rate);
    }
}