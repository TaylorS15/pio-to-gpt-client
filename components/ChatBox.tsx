'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '@/components/Chat';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import axios from 'axios';

const formSchema = z.object({
	question: z
		.string({
			required_error: 'Please enter a question.',
		})
		.min(5, 'Please enter at least 5 characters.')
		.max(150, 'Please enter at most 150 characters.'),
	formation: z.string().optional(),
	dynamic: z.string().optional(),
});

export default function ChatBox() {
	const { addQuestion, updateResponse } = useAppStore();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			question: '',
			formation: undefined,
			dynamic: undefined,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		addQuestion([[values.question, values.formation ?? '', values.dynamic ?? ''], '']);

		axios({
			method: 'post',
			url: `${process.env.NEXT_PUBLIC_API_URL}/api/question`,
			data: form.getValues(),
		})
			.then((res) => {
				updateResponse(res.data.message);
			})
			.catch((error) => {
				updateResponse(error.response.data);
			});

		form.reset();
	}

	return (
		<div className="w-full flex flex-col gap-4 max-w-5xl mx-auto">
			<div className="max-w-3xl w-full">
				<div className="h-[.15rem] w-3/5 bg-gray-300 rounded-md transition"></div>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full max-w-3xl text-white">
					<div className="w-full flex max-w-3xl gap-4">
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => (
								<FormItem className="flex-grow">
									<FormMessage />
									<FormControl>
										<Input
											{...field}
											autoComplete="off"
											className="w-full bg-black h-12 text-md"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-24 h-12 mt-auto bg-white select-none rounded-md text-black hover:bg-gray-300 transition">
							Send
						</Button>
					</div>
					<div className="mt-4 select-none">
						<div className="w-max gap-4 flex">
							<FormField
								control={form.control}
								name="dynamic"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value ?? ''}>
												<SelectTrigger className="w-[125px]">
													<SelectValue placeholder="Dynamic" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="SRP">SRP</SelectItem>
													<SelectItem value="3BP">3BP</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="formation"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select
												disabled={
													form.getValues('dynamic') === undefined ?? true
												}
												onValueChange={field.onChange}
												value={field.value ?? ''}>
												<SelectTrigger className="w-[150px]">
													<SelectValue placeholder="Formation" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="BUvBB">BU vs BB</SelectItem>
													<SelectItem value="COvBB">CO vs BB</SelectItem>
													<SelectItem value="MPvBB">MP vs BB</SelectItem>
													<SelectItem value="UTGvBB">
														UTG vs BB
													</SelectItem>
													<SelectItem value="SBvBB">SB vs BB</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="bg-white text-black hover:bg-gray-300 transition"
								type="reset"
								onClick={() => {
									form.reset({
										question: form.getValues('question'),
										formation: undefined,
										dynamic: undefined,
									});
								}}>
								Reset
							</Button>
						</div>
						<p className="mt-2 text-sm">Optional Parameters</p>
					</div>
				</form>
			</Form>
		</div>
	);
}
