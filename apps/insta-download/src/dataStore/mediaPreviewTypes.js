import ReelPreview from "@/variants/ReelPreview/ReelPreview";
import StoryPreview from "@/variants/StoryPreview/StoryPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";

export const previewComponentMap = {
  reel: (props) => <ReelPreview {...props} />,
  reels: (props) => <ReelPreview {...props} />,
  video: (props) => <ReelPreview {...props} />,

  story: (props) => {
    // Ensure we have valid stories data
    const stories = props.data?.medias || [];
    console.log('Story preview props:', props.data);
    console.log('Stories array:', stories);

    return <StoryPreview stories={Array.isArray(stories) ? stories : []} {...props} />;
  },

  stories: (props) => {
    const stories = props.data?.medias || [];
    console.log('Stories preview props:', props.data);
    console.log('Stories array:', stories);

    return <StoryPreview stories={Array.isArray(stories) ? stories : []} {...props} />;
  },

  photo: (props) => <PhotoPostPreview {...props} />,
  viewer: (props) => <PhotoPostPreview {...props} />,
  igtv: (props) => <PhotoPostPreview {...props} />,
  carousel: (props) => <PhotoPostPreview {...props} />,
};