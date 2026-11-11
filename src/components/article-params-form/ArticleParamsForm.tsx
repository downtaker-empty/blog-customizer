import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  type ArticleStateType as TArticleState,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
  articleParams: TArticleState;
  onApply: (params: TArticleState) => void;
};

export const ArticleParamsForm = ({
  articleParams,
  onApply,
}: TArticleParamsFormProps): React.JSX.Element => {
  const [asideIsOpen, setAsideIsOpen] = useState(false);
  const [draft, setDraft] = useState<TArticleState>(articleParams);

  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Element;

      if (asideIsOpen && asideRef.current && !asideRef.current.contains(target)) {
        setAsideIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [asideIsOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(draft);
    setAsideIsOpen(false);
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>): void => {
    setDraft(defaultArticleState);
    onApply(defaultArticleState);
    setAsideIsOpen(false);
    e.preventDefault();
  };

  const handleFieldChange =
    <K extends keyof TArticleState>(field: K): ((option: TArticleState[K]) => void) =>
    (option: TArticleState[K]): void => {
      setDraft((prev): TArticleState => ({ ...prev, [field]: option }));
    };

  return (
    <>
      <ArrowButton isOpen={asideIsOpen} onClick={() => setAsideIsOpen((p) => !p)} />

      <aside
        ref={asideRef}
        className={clsx(styles.container, { [styles.container_open]: asideIsOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <p>Задайте параметры</p>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={draft.fontFamilyOption}
            onChange={handleFieldChange('fontFamilyOption')}
          />
          <RadioGroup
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={draft.fontSizeOption}
            name="font"
            onChange={handleFieldChange('fontSizeOption')}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={draft.fontColor}
            onChange={handleFieldChange('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={draft.backgroundColor}
            onChange={handleFieldChange('backgroundColor')}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={draft.contentWidth}
            onChange={handleFieldChange('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
