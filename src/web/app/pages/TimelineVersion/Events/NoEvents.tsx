import { LinkButton } from '~/web/app/components/LinkButton';

interface NoEventsProps {
  newEventPath: string;
}

export const NoEvents = ({ newEventPath }: NoEventsProps) => (
  <div className="ml-4 rounded-sm bg-white p-4">
    <div className="text-center">
      <h2 className="mb-3 font-bold">No events</h2>

      <p className="mb-3">No events</p>

      <LinkButton title="Add event" to={newEventPath}>
        Add event
      </LinkButton>
    </div>
  </div>
);
