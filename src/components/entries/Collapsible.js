import {
  useContext,
  useMemo,
  useState
} from 'preact/hooks';

import classnames from 'classnames';

import {
  LayoutContext
} from '../../context';

import {
  ListArrowIcon,
  ListDeleteIcon,
} from '../icons';


export default function CollapsibleEntry(props) {
  const {
    id,
    entries = [],
    label,
    remove: RemoveContainer,
    open: shouldOpen
  } = props;

  const {
    layout,
    setLayoutForKey
  } = useContext(LayoutContext);

  const layoutKey = useMemo(() => {
    return `collapsible-${id}`;
  }, [ id ]);

  const collapsibleLayout = layout[layoutKey] || {};

  const [ open, setOpen ] = useState(shouldOpen || collapsibleLayout.open);

  const toggleOpen = () => {
    setOpen(!open);
    setLayoutForKey(layoutKey, {
      ...collapsibleLayout,
      open: !open
    });
  };

  // todo(pinussilvestrus): translate once we have a translate mechanism for the core
  const placeholderLabel = '<empty>';

  return (
    <div
      data-entry-id={ id }
      class={ classnames(
        'bio-properties-panel-collapsible-entry',
        open ? 'open' : ''
      ) }>
      <div class="bio-properties-panel-collapsible-entry-header" onClick={ toggleOpen }>
        <div
          class={ classnames(
            'bio-properties-panel-collapsible-entry-header-title',
            !label && 'empty'
          ) }>
          { label || placeholderLabel }
        </div>
        <div class="bio-properties-panel-collapsible-entry-arrow">
          <ListArrowIcon class={ open ? 'bio-properties-panel-arrow-down' : 'bio-properties-panel-arrow-right' } />
        </div>
        {
          RemoveContainer
            ?
            (
              <RemoveContainer>
                <ListDeleteIcon class="bio-properties-panel-remove-entry" />
              </RemoveContainer>
            )
            : null
        }
      </div>
      <div class={ classnames(
        'bio-properties-panel-collapsible-entry-entries',
        open ? 'open' : ''
      ) }>
        {
          entries.map(e => e.component)
        }
      </div>
    </div>
  );
}