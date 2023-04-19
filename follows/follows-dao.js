import followsModel from "./follows-model.js";

export const followUser = (follow) =>
    followsModel.create(follow)


export const unFollowUser = (follow) =>
    followsModel.deleteOne(follow)

export const findFollowersByFollowedId = (followedId) =>
    followsModel.find({followed: followedId})
    .populate('follower')
    .exec()

export const findFollowingByFollowerId = (followerId) =>
    followsModel.find({follower: followerId})
    .populate('followed')
    .exec()