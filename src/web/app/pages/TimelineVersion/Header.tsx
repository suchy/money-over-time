import { TimelineVersion } from '../../../../domain/timelineVersion/timelineVersion';
import { Container } from '../../components/Container';
import { renameTimelineVersionPath } from '../../utils/paths';

interface TimelinePageHeaderProps {
  timelineVersion: TimelineVersion;
  onLayoutChange: () => void;
}

export const Header = ({
  timelineVersion,
  onLayoutChange
}: TimelinePageHeaderProps) => {
  const { timelineVersionId, name } = timelineVersion;

  // const handleLayoutChange = () => {
  //   onLayoutChange();
  // };

  return (
    <div className="z-10 flex h-16 flex-shrink-0 flex-grow-0 flex-row items-center justify-between bg-white px-6 shadow-sm">
      <div className="flex items-center">
        <div className="mr-6 aspect-square rounded-sm bg-green-200 px-1 text-3xl font-bold text-green-900">
          M
        </div>

        <p className="border-l pl-6 ">
          <span className="block text-lg font-semibold leading-none">
            {name}
          </span>
          <span className="text-sm text-gray-500">by John Doe</span>
        </p>
        {/*
          <IconButton
            aria-label="Edit timeline name"
            icon={<EditIcon />}
            size="sm"
            title="Edit timeline name"
            variant="ghost"
            as={Link}
            to={renameTimelineVersionPath(timelineVersionId)}
          /> */}
      </div>

      {/* <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Settings"
              icon={<SettingsIcon />}
              size="sm"
              mr="4"
            />

            <MenuList>
              <MenuItem onClick={console.log}>Switch layout</MenuItem>
            </MenuList>
          </Menu>

        </Box> */}
      {/* <SaveTimelineVersionButton timelineVersion={timelineVersion} /> */}
    </div>
  );
};
