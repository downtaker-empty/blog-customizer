import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { clsx } from 'clsx';
import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type TArticleState = typeof defaultArticleState;

type TArticleParamsFormProps = {
  articleParams: TArticleState;
  onApply: (params: TArticleState) => void;
};

export const ArticleParamsForm = ({
  articleParams,
  onApply,
}: TArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const [draft, setDraft] = useState<TArticleState>(articleParams);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(draft);
    setIsOpen(false);
  };

  const handleReset = (): void => {
    setDraft(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((p) => !p)} />

      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <p>Задайте параметры</p>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={draft.fontFamilyOption}
            onChange={(option): void =>
              setDraft((prev): TArticleState => ({ ...prev, fontFamilyOption: option }))
            }
          />
          <RadioGroup
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={draft.fontSizeOption}
            name="font"
            onChange={(option): void =>
              setDraft((prev): TArticleState => ({ ...prev, fontSizeOption: option }))
            }
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={draft.fontColor}
            onChange={(option): void =>
              setDraft((prev): TArticleState => ({ ...prev, fontColor: option }))
            }
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={draft.backgroundColor}
            onChange={(option): void =>
              setDraft((prev): TArticleState => ({ ...prev, backgroundColor: option }))
            }
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={draft.contentWidth}
            onChange={(option): void =>
              setDraft((prev): TArticleState => ({ ...prev, contentWidth: option }))
            }
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
