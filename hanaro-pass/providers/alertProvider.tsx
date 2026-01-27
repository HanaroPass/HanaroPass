'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type AlertRenderApi = {
  close: () => void;
};

/**
 * @options title 모달 제목(화면에 보이는 타이틀)
 * @options description 모달 설명(화면에 보이는 설명)
 * @options actionLabel 확인 버튼 텍스트
 * @options cancelLabel 취소 버튼 텍스트
 * @options variant 확인 버튼 스타일(파괴적 액션이면 destructive)
 * @options onAction 확인 버튼 클릭 시 실행할 함수(비동기 가능)
 *
 * @options content title/description 아래(바디)에 들어갈 커스텀 UI
 * @options footer Footer를 통째로 교체하고 싶을 때(ReactNode 또는 render function)
 * @options render 전체 레이아웃을 통째로 커스텀하고 싶을 때(ReactNode 또는 render function)
 *
 * @options hideCancel 단일 확인 모달처럼 cancel 버튼 숨기기
 * @options closeOnAction 확인 버튼 클릭 후 자동 close 여부(기본 true)
 *
 * @options contentClassName AlertDialogContent className 커스텀
 * @options actionProps action 버튼 props 커스텀(disabled 등)
 * @options cancelProps cancel 버튼 props 커스텀(disabled 등)
 *
 * @options srTitle 스크린리더용 타이틀(보이는 타이틀이 없을 때도 a11y를 위해 제공)
 * @options srDescription 스크린리더용 설명(보이는 설명이 없을 때도 a11y를 위해 제공)
 * @options disableAriaDescription 설명이 불필요/중복일 때 description 낭독을 끄고 싶다면 true
 */
interface AlertOptions {
  title?: string;
  description?: string;
  actionLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  onAction?: () => void | Promise<void>;

  content?: ReactNode;
  footer?: ReactNode | ((api: AlertRenderApi) => ReactNode);
  render?: ReactNode | ((api: AlertRenderApi) => ReactNode);

  hideCancel?: boolean;
  closeOnAction?: boolean;

  contentClassName?: string;

  actionProps?: Omit<
    React.ComponentProps<typeof AlertDialogAction>,
    'onClick' | 'children'
  >;
  cancelProps?: Omit<
    React.ComponentProps<typeof AlertDialogCancel>,
    'children'
  >;

  srTitle?: string;
  srDescription?: string;
  disableAriaDescription?: boolean;
}

interface AlertDialogContextType {
  alert: (options: AlertOptions) => void;
  close: () => void;
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined,
);

const defaultOptions: Required<
  Pick<
    AlertOptions,
    | 'title'
    | 'description'
    | 'actionLabel'
    | 'cancelLabel'
    | 'variant'
    | 'onAction'
    | 'hideCancel'
    | 'closeOnAction'
    | 'srTitle'
    | 'srDescription'
    | 'disableAriaDescription'
  >
> = {
  title: '',
  description: '',
  actionLabel: '확인',
  cancelLabel: '취소',
  variant: 'default',
  onAction: () => {},
  hideCancel: false,
  closeOnAction: true,
  srTitle: '',
  srDescription: '',
  disableAriaDescription: false,
};

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions>(defaultOptions);

  const close = useCallback(() => setIsOpen(false), []);

  const api = useMemo<AlertRenderApi>(() => ({ close }), [close]);

  const alert = useCallback((newOptions: AlertOptions) => {
    setOptions({
      ...defaultOptions,
      ...newOptions,
      title: newOptions.title ?? defaultOptions.title,
      description: newOptions.description ?? defaultOptions.description,
      actionLabel: newOptions.actionLabel ?? defaultOptions.actionLabel,
      cancelLabel: newOptions.cancelLabel ?? defaultOptions.cancelLabel,
      variant: newOptions.variant ?? defaultOptions.variant,
      onAction: newOptions.onAction ?? defaultOptions.onAction,
      hideCancel: newOptions.hideCancel ?? defaultOptions.hideCancel,
      closeOnAction: newOptions.closeOnAction ?? defaultOptions.closeOnAction,
      srTitle: newOptions.srTitle ?? defaultOptions.srTitle,
      srDescription: newOptions.srDescription ?? defaultOptions.srDescription,
      disableAriaDescription:
        newOptions.disableAriaDescription ??
        defaultOptions.disableAriaDescription,
    });
    setIsOpen(true);
  }, []);

  const handleAction = async () => {
    try {
      await options.onAction?.();
      if (options.closeOnAction !== false) close();
    } catch {
      // noop
    }
  };

  const a11yTitle = options.srTitle || options.title || '알림';
  const a11yDescription = options.disableAriaDescription
    ? ''
    : options.srDescription || options.description || '대화상자';

  const renderFooter = () => {
    if (options.footer) {
      return typeof options.footer === 'function'
        ? options.footer(api)
        : options.footer;
    }

    return (
      <AlertDialogFooter>
        {!options.hideCancel && (
          <AlertDialogCancel {...options.cancelProps}>
            {options.cancelLabel}
          </AlertDialogCancel>
        )}

        <AlertDialogAction
          onClick={handleAction}
          className={
            options.variant === 'destructive'
              ? 'bg-red-600 hover:bg-red-700'
              : undefined
          }
          {...options.actionProps}
        >
          {options.actionLabel}
        </AlertDialogAction>
      </AlertDialogFooter>
    );
  };

  const renderMain = () => {
    if (options.render) {
      return typeof options.render === 'function'
        ? options.render(api)
        : options.render;
    }

    return (
      <>
        <AlertDialogHeader>
          {options.title ? (
            <AlertDialogTitle>{options.title}</AlertDialogTitle>
          ) : null}

          {options.description ? (
            <AlertDialogDescription>
              {options.description}
            </AlertDialogDescription>
          ) : null}

          {options.content ? (
            <div className="mt-2 w-full">{options.content}</div>
          ) : null}
        </AlertDialogHeader>

        {renderFooter()}
      </>
    );
  };

  return (
    <AlertDialogContext.Provider value={{ alert, close }}>
      {children}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className={options.contentClassName}>
          <VisuallyHidden.Root>
            <AlertDialogTitle>{a11yTitle}</AlertDialogTitle>
            {!options.disableAriaDescription ? (
              <AlertDialogDescription>{a11yDescription}</AlertDialogDescription>
            ) : null}
          </VisuallyHidden.Root>

          {renderMain()}
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertDialogProvider');
  }
  return context;
}
