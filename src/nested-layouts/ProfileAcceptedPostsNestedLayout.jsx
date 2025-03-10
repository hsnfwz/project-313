import { useContext, useEffect, useState } from 'react';
import { getAcceptedPostsByProfileId } from '../common/database/posts.js';
import { DataContext, UserContext } from '../common/contexts.js';

import Loading from '../components/Loading.jsx';
import Loaded from '../components/Loaded.jsx';
import Post from '../components/Post.jsx';

function ProfileAcceptedPostsNestedLayout() {
  const { activeProfile } = useContext(DataContext);
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const { profileAcceptedPosts, setProfileAcceptedPosts } =
    useContext(DataContext);

  useEffect(() => {
    if (activeProfile) {
      if (!profileAcceptedPosts.hasInitializedData) {
        getAcceptedPosts();
      }
    }
  }, [activeProfile]);

  async function getAcceptedPosts() {
    setIsLoading(true);

    const { data, hasMore } = await getAcceptedPostsByProfileId(
      activeProfile.id,
      profileAcceptedPosts.data.length
    );

    const _profileAcceptedPosts = { ...profileAcceptedPosts };

    if (data.length > 0) {
      _profileAcceptedPosts.data = [...profileAcceptedPosts.data, ...data];
    }

    _profileAcceptedPosts.hasMoreData = hasMore;

    if (!profileAcceptedPosts.hasInitializedData) {
      _profileAcceptedPosts.hasInitializedData = true;
    }

    setProfileAcceptedPosts(_profileAcceptedPosts);

    setIsLoading(false);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {profileAcceptedPosts.data.map((post, index) => (
        <div key={index}>
          {!post.is_anonymous && <Post post={post} isPreview={true} />}
          {post.is_anonymous && user.id === post.user.id && (
            <Post post={post} isPreview={true} />
          )}
        </div>
      ))}
      {!profileAcceptedPosts.hasMoreData && <Loaded />}
      {isLoading && <Loading />}
    </div>
  );
}

export default ProfileAcceptedPostsNestedLayout;
