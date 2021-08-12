import React from 'react';
import { Paragraph, BodyText } from '@apollosproject/ui-kit';

import { Slide, SlideContent } from '@apollosproject/ui-onboarding';

const Intro = () => (
  <Slide>
    <SlideContent title={`Welcome to ${'\n'}Apollos Storybook!`} icon>
      <Paragraph>
        <BodyText>
          Storybook is the component workshop for the Apollos app platform.
        </BodyText>
      </Paragraph>
      <Paragraph>
        <BodyText>
          A story is a single state of one or more UI components. You can have
          as many stories as you want.
        </BodyText>
      </Paragraph>
      <Paragraph>
        <BodyText>
          We use Storybook to help document UI and to serve as visual test cases
          for different states.
        </BodyText>
      </Paragraph>
      <Paragraph>
        <BodyText>
          Open the navigator using the navigation bar at the bottom of the
          screen to navigate the available stories.
        </BodyText>
      </Paragraph>
      <Paragraph>
        <BodyText>
          The stories defined inside of your app will be listed first, with
          Apollos UI stories below them. If you setup a theme, all of the
          stories will reflect your theme.
        </BodyText>
      </Paragraph>
    </SlideContent>
  </Slide>
);

export default Intro;
